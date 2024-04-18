"use client";
import uniqid from "uniqid";
import React, { useState } from "react";
import Modals from "./Modals";
import useUploadModal from "@/hooks/useUploadModal";

import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useUser } from "@/hooks/useUser";
import { toast } from "./ui/use-toast";

import { useRouter } from "next/navigation";
import { createClient } from "@/util/supabase/client";
import Input from "./Input";

// const formSchema = z.object({
//   author: z.string().min(2).max(50),
//   title: z.string().min(2).max(25),
//   song: z.any(),
//   image: z.any(),
// });
const UploadModal = () => {
  const router = useRouter();
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     author: "",
  //     title: "",
  //     song: undefined,
  //     image: undefined,
  //   },
  // });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const supabaseClient = createClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      console.log(values);
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile && !songFile && !user!) {
        toast({
          variant: "destructive",
          title: "Fill up the empty Fields",
        });
        return;
      }

      const uniqueID = uniqid();

      //upload songs
      const { data: songData, error: SongError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (SongError) {
        console.log(SongError);
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: "Failed to Upload the song",
        });
      }

      //upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: "Failed to Upload the image",
        });
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: "Failed to Upload the image",
        });
      }

      router.refresh();
      setIsLoading(false);
      toast({
        title: "Song added to Database",
      });
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Modals
        title="Add Song"
        description="Upload an mp3 file "
        isOpen={uploadModal.isOpen}
        onChange={onChange}
      >
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Song Title"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Authors Name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="song"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a Song file </FormLabel>
                  <FormControl>
                    <input
                      className="broder-2"
                      type="file"
                      accept=".mp3"
                      disabled={isLoading}
                      { ...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select an Image</FormLabel>
                  <FormControl>
                    <input
                      className="border-2"
                      type="file"
                      accept="image/*"
                      disabled={isLoading}
                      { ...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Input
            id="title"
            disabled={isLoading}
            {...register("title", { required: true })}
            placeholder="Song Title"
          />
          <Input
            id="author"
            disabled={isLoading}
            {...register("author", { required: true })}
            placeholder="Author"
          />
          <div>
            <div className="pb-1">select a song file</div>
            <Input
              id="song"
              type="file"
              disabled={isLoading}
              accept=".mp3"
              {...register("song", { required: true })}
            />
          </div>
          <div>
          <div className="pb-1">
            select a Image file
          </div>
          <Input
         id='image'
         type='file'
         disabled={isLoading}
         accept="image/*"
         {...register('image',{required:true})}
         />
         
         </div>
         <Button disabled={isLoading} type='submit'>
           Create
         </Button>
        </form>
      </Modals>
    </div>
  );
};

export default UploadModal;
