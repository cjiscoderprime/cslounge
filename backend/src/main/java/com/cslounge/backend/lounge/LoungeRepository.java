package com.cslounge.backend.lounge;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoungeRepository extends JpaRepository<Lounge, Long>{
List<Lounge> findAllByOrderByNameAsc();

Optional<Lounge> findBySlug(String slug);
}

