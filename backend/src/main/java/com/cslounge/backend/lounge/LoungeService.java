package com.cslounge.backend.lounge;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LoungeService {

    private final LoungeRepository loungeRepository;

    public LoungeService(LoungeRepository loungeRepository){
        this.loungeRepository = loungeRepository;
    }

    public List<LoungeResponse> getAllLounges(){
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
}
