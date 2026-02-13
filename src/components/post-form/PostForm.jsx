import React, {useCallback, useEffect, useState} from 'react'
import {Input, Button, Select, RTE, Container} from '../index.js'
import appwriteServices from '../../appwrite/conf.js'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import parse from 'html-react-parser'

export default function PostForm({post}) {
    if(post){
        console.log(post);
    }
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, getValues, watch, control} = useForm({
        defaultValues:{
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || '',
            slug: post?.$id || ''
        }
    })

    const userData = useSelector((state)=>state.auth.userData);

    const submit = async (data)=>{
        console.log(data);
        if(post){
            // check if a new image is uploaded or not: if uploaded then upload that image to appwrite's bucket
            const file = data.image[0]?  await appwriteServices.uploadFile(data.image[0]): null

            // if new image is uploaded to bucket successfully then you need to remove the old postImage first
            if(file){
                await appwriteServices.deleteFile(post.featuredImage);
            }
            // update the post
            const updatedPost = await appwriteServices.updatePost(post.$id, {...data, featuredImage: file? file.$id : undefined})

            // if updating post was successfull then navigate user to that post 
            if(updatedPost){
                navigate(`/post/${updatedPost.$id}`)
            }
        } // else means post nhi aya hai to new post create krna padega
        else{
            const file =data.image[0]? await appwriteServices.uploadFile(data.image[0]): null

            if(file){
                const fileId = file.$id;
                console.log({fileId})
                data.featuredImage = fileId;

                const newPost = await appwriteServices.createPost({...data, userId: userData? userData.$id: ''})

                if(newPost){
                    navigate(`/post/${newPost.$id}`);
                }
            }

            
        }
    }

    const transformSlug = useCallback((value)=>{
        if(value && typeof(value) == 'string')
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d]+/g, '_')
        return ''
    }, [])

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(!post && name == 'title'){
                setValue("slug", transformSlug(value.title), {shouldValidate: true})
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }
    }, [watch, transformSlug, setValue])

  return (
    <Container className='py-8'>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    defaultValue={getValues("title")}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    defaultValue={getValues("slug")}
                    disable={post}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteServices.getFilePreview(post?.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    defaultValue={getValues("status")}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </Container>
        
    )
}
