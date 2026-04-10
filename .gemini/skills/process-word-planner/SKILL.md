---
name: process-word-planner
description: Creates a plan for processing the word.
---

# Word Processing Planner

- Go through all the words from the `<WORKSPACE_ROOT>/tmp/words.txt` and create
  a `plan.md` file inside `<WORKSPACE_ROOT>/tmp/`. It should create a task list
  where each task should be: `process <word>`. For example:
  ```md
  - [ ] process apple
  - [ ] process banana
  ```
- If there are a lot of words in the list, then split them in batches of 10000.
  Create sub-plan `sub-plans/plan-00001.md`, `sub-plans/plan-00002.md`, ...
  files and each sub-plan should have a task list of 10000 words in them. The
  root `plan.md` will act as the master plan that controls each sub-plan. Now,
  instead of having all words as task list in the root plan, have each sub-plan
  as a task list in it. Once a sub-plan's processing is completed, mark it as
  completed in the root plan.

* For each word, start processing each word using the `process-word` skill. Once
  done, mark that word as completed in the `plan.md` file.

* If the word definition file already has definitions for the word along with
  examples, check if you are asked to do a force update. If not, then skip
  processing it and just mark it as completed in either the plan or in the
  respective sub-plan file. However, if you are asked to do a force update, then
  **DO NOT** skip the word. Assume that the definitions available to us in the
  word's file are obsolete and we have to forcefully refresh them. So, process
  that word.

* Add all necessary context at the top of the `plan.md` file so that even if the
  processing crashes in between, in the next turn, I should be able to just say
  that "Resume with the plan" and the executor should know exactly what should
  be done and continue with the plan.

* Once the entire plan and sub-plans are completed, clean up the temporary files
  except the DLQ from `<WORKSPACE_ROOT>/tmp/` directory.

* If there is something in the DLQ, notify the user about it. Add this as a last
  task in the `plan.md` file.
