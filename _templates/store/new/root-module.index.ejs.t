---
inject: true
to: src/store/index.ts
before: const vuexLocal
---
import { <%= name%> } from './<%= name%>/index';
