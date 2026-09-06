package com.cslounge.backend.post;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/posts")

public class PostController {
    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping
    public List<PostFeedResponse> getPosts(){
        return postService.getAllPosts();
    }

    @GetMapping("/by-lounge")
    public List<PostFeedResponse> getPostsByLounge(
        @RequestParam String slug
    ){
        return postService.getPostsByLoungeSlug(slug);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@RequestBody CreatePostRequest request){
        return postService.createPost(request);
    } 
}
