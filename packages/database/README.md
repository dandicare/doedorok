# @repo/database

Prisma ORM을 사용한 PostgreSQL 데이터베이스 패키지입니다.

## 설정

1. 환경 변수 설정:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

2. Prisma 설정:
```bash
# 클라이언트 생성
npm run db:generate

# 데이터베이스 스키마 동기화
npm run db:push

# 마이그레이션 실행
npm run db:migrate
```

## 사용법

```typescript
import { prisma, userService } from '@repo/database';

// 직접 Prisma 클라이언트 사용
const users = await prisma.user.findMany();

// 서비스 함수 사용 (권장)
const users = await userService.getUsers();
```

## 예시

- `examples/basic-usage.ts` - 기본 CRUD 작업
- `examples/react-component.tsx` - React 컴포넌트에서 사용
- `examples/nextjs-api.ts` - Next.js API 라우트에서 사용

## 스키마 수정

`prisma/schema.prisma` 파일을 수정한 후:

```bash
npm run db:generate  # 타입 재생성
npm run db:push      # 개발 환경 동기화
# 또는
npm run db:migrate   # 프로덕션용 마이그레이션
```