# Assignment 6 - Evaluation Metrics

## Overview
This evaluation measures three aspects of the system:

1. Output quality
2. End-to-end task success
3. Retrieval quality (upstream component)

Each case will be evaluated using consistent criteria.

---

# 1. Output Quality

## Metric type
Rubric-based scoring (0–2 scale)

## Criteria

Score 2 (Good):
- Answer is correct
- Answer is relevant to the question
- Answer is grounded in retrieved content
- Answer is clear and understandable

Score 1 (Partial):
- Answer is somewhat correct
- Some missing details or minor inaccuracies
- Partially grounded

Score 0 (Poor):
- Answer is incorrect or irrelevant
- Not grounded in source chunks
- Hallucinated or unsupported content

## Why this metric
The task is question answering, so correctness and grounding are more important than exact wording.

---

# 2. End-to-End Task Success

## Metric type
Binary (Success / Fail)

## Criteria

Success:
- User submits question
- System returns an answer
- Sources are displayed
- Answer is usable for the user’s intent

Fail:
- No answer returned
- UI breaks
- Answer is unusable or misleading

## Why this metric
The system must work as a complete pipeline from UI to response.

---

# 3. Retrieval Quality (Upstream Component)

## Metric type
Hit-based evaluation

## Criteria

Good:
- At least one retrieved chunk is clearly relevant to the question

Partial:
- Retrieved chunks are somewhat related but not strongly relevant

Poor:
- Retrieved chunks are irrelevant or incorrect

## Why this metric
This system is retrieval-first, so retrieval quality directly affects final output.

---

# Summary Table

| Metric | Type | Scale |
|------|------|------|
| Output Quality | Rubric | 0–2 |
| End-to-End Success | Binary | Success / Fail |
| Retrieval Quality | Qualitative | Good / Partial / Poor |

---

# Expected Behavior

Representative cases:
- Mostly score 2 (good)

Failure cases:
- Likely score 0 or 1
- May fail retrieval or grounding

Baseline:
- Expected to perform worse than retrieval-first system