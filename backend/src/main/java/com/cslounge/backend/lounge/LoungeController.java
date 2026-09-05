package com.cslounge.backend.lounge;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/lounges")
public class LoungeController {
    
    private final LoungeService loungeService;

    public LoungeController(LoungeService loungeService){
        this.loungeService = loungeService;
    }

    @GetMapping
    public List<LoungeResponse> getAllLounges() {
        return loungeService.getAllLounges();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<LoungeResponse> getLoungeBySlug(
        @PathVariable String slug
    ) {
        LoungeResponse lounge = loungeService.getLoungeBySlug(slug);

        if(lounge == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(lounge);
    }
}

