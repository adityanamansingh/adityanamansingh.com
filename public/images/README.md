# Drop your images here

The site detects files by name (no code change needed; restart the production server after adding).
Formats: jpg, jpeg, png, webp, avif.

| File name (without extension) | Where it shows |
|---|---|
| `portrait` | Hero portrait tile |
| `life-trek`, `life-mountain` (the Haridwar & Ganga ji tile), `life-music`, `life-dance`, `life-travel` | "Beyond code" mosaic |
| `project-mono-solutions`, `project-admitquest` (svg also works; the file name must match the slug exactly, so not `project-admitquest.ai.svg`), `project-collegesearch`, `project-layali`, `project-rowdy-meals` | Project card + case-study cover |
| `project-<slug>-2`, `-3`, `-4` | Case-study gallery |

Tips: portrait ~4:5, life tiles ~1:1 or 4:3, project covers 16:10. Keep each under ~400 KB (use webp). Always add a real description in `data/` if a photo needs context for screen readers.
