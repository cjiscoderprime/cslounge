package com.cslounge.backend.post;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<PostFeedResponse> getAllPosts(){
        return postRepository.findFeedPosts()
        .stream()
        .map(row -> new PostFeedResponse(
            row.getId(),
            row.getTitle(),
            row.getContent(),
            row.getAuthor(),
            row.getLounge(),
            row.getVotes(),
            row.getComments()
        ))
        .toList();
    }

    public Post createPost(CreatePostRequest request){
        Post post = new Post(
            request.authorId(),
            request.loungeId(),
            request.title(),
            request.content()
        );
        return postRepository.save(post);
    }









}
