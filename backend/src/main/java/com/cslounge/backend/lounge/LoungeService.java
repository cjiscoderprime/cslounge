package com.cslounge.backend.lounge;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LoungeService {

    private final LoungeRepository loungeRepository;

    public LoungeService(LoungeRepository loungeRepository) {
        this.loungeRepository = loungeRepository;
    }

    public List<LoungeResponse> getAllLounges() {
        return loungeRepository.findAllByOrderByNameAsc()
            .stream()
            .map(lounge -> new LoungeResponse(
                lounge.getId(),
                lounge.getName(),
                lounge.getSlug()
            ))
            .toList();
    }

    public LoungeResponse getLoungeBySlug(String slug) {
        return loungeRepository.findBySlug(slug)
            .map(lounge -> new LoungeResponse(
                lounge.getId(),
                lounge.getName(),
                lounge.getSlug()
            ))
            .orElse(null);
    }

    public Lounge createLounge(CreateLoungeRequest request) {
        String name = request.name().trim();

        if (name.isBlank()) {
            throw new IllegalArgumentException(
                "Lounge name cannot be empty"
            );
        }

        if (loungeRepository.existsByNameIgnoreCase(name)) {
            throw new IllegalArgumentException(
                "A lounge with this name already exists"
            );
        }

        String slug = name
            .toLowerCase()
            .replaceAll("[^a-z0-9\\s-]", "")
            .replaceAll("\\s+", "-")
            .replaceAll("-+", "-")
            .replaceAll("^-|-$", "");

        if (slug.isBlank()) {
            throw new IllegalArgumentException(
                "Lounge name must contain letters or numbers"
            );
        }

        if (loungeRepository.existsBySlug(slug)) {
            throw new IllegalArgumentException(
                "A lounge with this name already exists"
            );
        }

        Lounge lounge = new Lounge(
            name,
            slug
        );

        return loungeRepository.save(lounge);
    }
}
