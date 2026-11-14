package com.cslounge.backend.post;

import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/mine")
    public ResponseEntity<?> getMyPosts(
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in");
        }

        return ResponseEntity.ok(
            postService.getPostsByAuthorId(
                (Long) userId
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(
        @PathVariable Long id,
        HttpSession session
    ) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("You must be logged in");
        }

        try {
            boolean deleted = postService.deletePost(
                id, 
                (Long) userId
            );

            if (!deleted) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.noContent().build();

        } catch (IllegalStateException error) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(error.getMessage());
        }
    }
}
