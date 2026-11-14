package com.cslounge.backend.post;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PostFeedResponse> getAllPosts() {
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

    public List<PostFeedResponse> getPostsByLoungeSlug(String slug) {
        return postRepository.findFeedPostsByLoungeSlug(slug)
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

    public Post createPost(
        CreatePostRequest request,
        Long authorId
    ) {
        Post post = new Post(
            authorId,
            request.loungeId(),
            request.title(),
            request.content()
        );

        return postRepository.save(post);
    }

    public PostFeedResponse getPostById(Long id) {
        return postRepository.findPostById(id)
            .map(row -> new PostFeedResponse(
                row.getId(),
                row.getTitle(),
                row.getContent(),
                row.getAuthor(),
                row.getLounge(),
                row.getVotes(),
                row.getComments()
            ))
            .orElse(null);
    }

    public List<PostFeedResponse> getPostsByAuthorId(Long authorId) {
        return postRepository.findFeedPostsByAuthorId(authorId)
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

    public boolean deletePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
            .orElse(null);

        if (post == null) {
            return false;
        }

        if (!post.getAuthorId().equals(userId)) {
            throw new IllegalStateException(
                "You cannot delete another user's post"
            );
        }

        postRepository.delete(post);

        return true;
    }
}