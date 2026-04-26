package com.devpulse.controller;

import com.devpulse.service.MlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import java.util.Map;

@RestController
@RequestMapping("/api/insights")
public class InsightsController {
    @Autowired private MlService ml;

    @PostMapping("/productivity")
    public Mono<Map> productivity(@RequestBody Map<String,Object> body) { return ml.productivity(body); }

    @PostMapping("/burnout")
    public Mono<Map> burnout(@RequestBody Map<String,Object> body) { return ml.burnout(body); }

    @PostMapping("/skills")
    public Mono<Map> skills(@RequestBody Map<String,Object> body) { return ml.skills(body); }
}

