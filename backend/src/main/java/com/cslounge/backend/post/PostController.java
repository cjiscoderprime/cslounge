package com.cslounge.backend.post;

import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

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
    public ResponseEntity<?> createPost(
        @RequestBody CreatePostRequest request,
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in to create a post");
        }

        Post post = postService.createPost(
            request,
            (Long) userId
        );

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(post);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(
        @PathVariable Long id
    ) {
        PostFeedResponse post = postService.getPostById(id);

        if (post == null) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Post not found");
        }

        return ResponseEntity.ok(post);
    }
}
