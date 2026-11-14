package com.cslounge.backend.lounge;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.ResponseStatus;

import org.springframework.http.HttpStatus;

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

    @PostMapping
    public ResponseEntity<?> createLounge(
        @RequestBody CreateLoungeRequest request
    ) {
        try {
            Lounge lounge =
                loungeService.createLounge(request);

            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(lounge);

        } catch (IllegalArgumentException error) {

            String message = error.getMessage();

            if (
                message != null &&
                message.contains("already exists")
            ) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(message);
            }

            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(message);
        }
    }
}

