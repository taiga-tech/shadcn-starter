# 開発パターン・ベストプラクティス

## Next.js 開発パターン

### データハンドリングパターン

#### パターン1: ユーザー操作に依存しないデータ

```tsx
// Server Components + Server Actions
import { getUserData } from '@/lib/actions'

export default async function UserPage({ params }: { params: { id: string } }) {
    const user = await getUserData(params.id)

    return (
        <div>
            <h1>{user.name}</h1>
            <UserProfile user={user} />
        </div>
    )
}
```

#### パターン2: ユーザー操作に依存するデータ

```tsx
'use client'

import useSWR from 'swr'

import { getUserData } from '@/lib/actions'

export function UserProfile({ userId }: { userId: string }) {
    const { data: user, mutate } = useSWR(['user', userId], () =>
        getUserData(userId)
    )

    const handleUpdate = async (newData: UserData) => {
        // 楽観的更新
        mutate({ ...user, ...newData }, false)
        await updateUser(userId, newData)
        mutate() // 再検証
    }

    return <div>{/* UI */}</div>
}
```

### Server Actions パターン

```tsx
'use server'

import { revalidatePath } from 'next/cache'

import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
})

export async function updateUser(
    userId: string,
    data: z.infer<typeof userSchema>
) {
    // バリデーション
    const validatedData = userSchema.parse(data)

    try {
        // データベース操作
        const result = await db.user.update({
            where: { id: userId },
            data: validatedData,
        })

        // キャッシュ無効化
        revalidatePath('/users')

        return { success: true, data: result }
    } catch (error) {
        return { success: false, error: 'Failed to update user' }
    }
}
```

## コンポーネント設計パターン

### Compound Component パターン

```tsx
// components/card/index.tsx
import { createContext, useContext } from 'react'

interface CardContextValue {
    variant: 'default' | 'outlined'
}

const CardContext = createContext<CardContextValue | null>(null)

export function Card({
    variant = 'default',
    children,
}: {
    variant?: 'default' | 'outlined'
    children: React.ReactNode
}) {
    return (
        <CardContext.Provider value={{ variant }}>
            <div
                className={cn('rounded-lg', variant === 'outlined' && 'border')}
            >
                {children}
            </div>
        </CardContext.Provider>
    )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
    const context = useContext(CardContext)
    return <div className="border-b p-4">{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-4">{children}</div>
}

// 使用例
;<Card variant="outlined">
    <Card.Header>タイトル</Card.Header>
    <Card.Content>内容</Card.Content>
</Card>
```

### Custom Hook パターン

#### データ取得フック

```tsx
// hooks/use-user.ts
import useSWR from 'swr'

export function useUser(userId: string) {
    const { data, error, mutate } = useSWR(
        ['user', userId],
        () => fetchUser(userId),
        {
            revalidateOnFocus: false,
            dedupingInterval: 5000,
        }
    )

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        refresh: mutate,
    }
}
```

#### フォーム管理フック

```tsx
// hooks/use-form.ts
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(1, '名前は必須です'),
    email: z.string().email('正しいメールアドレスを入力してください'),
})

export function useUserForm(defaultValues?: Partial<FormData>) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    return {
        form,
        handleSubmit: form.handleSubmit,
        isValid: form.formState.isValid,
        errors: form.formState.errors,
    }
}
```

## Tailwind CSS パターン

### レスポンシブデザイン

```tsx
export function ResponsiveGrid() {
    return (
        <div
            className={cn(
                'grid gap-4',
                'grid-cols-1', // モバイル
                'md:grid-cols-2', // タブレット
                'lg:grid-cols-3', // デスクトップ
                'xl:grid-cols-4' // 大画面
            )}
        >
            {items.map((item) => (
                <GridItem key={item.id} {...item} />
            ))}
        </div>
    )
}
```

### ダークモード対応

```tsx
export function ThemeToggle() {
    return (
        <button
            className={cn(
                'rounded-lg p-2 transition-colors',
                'bg-gray-100 text-gray-900',
                'dark:bg-gray-800 dark:text-gray-100',
                'hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
        >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
        </button>
    )
}
```

## エラーハンドリングパターン

### Error Boundary

```tsx
// components/error-boundary.tsx
'use client'

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

// components/error-boundary.tsx

function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
        <div className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">エラーが発生しました</h2>
            <pre className="mb-4 rounded bg-gray-100 p-4">{error.message}</pre>
            <button
                onClick={resetErrorBoundary}
                className="rounded bg-blue-500 px-4 py-2 text-white"
            >
                リトライ
            </button>
        </div>
    )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    )
}
```

### サスペンス パターン

```tsx
import { Suspense } from 'react'

export default function UserPage() {
    return (
        <div>
            <h1>ユーザー情報</h1>
            <Suspense fallback={<UserProfileSkeleton />}>
                <UserProfile />
            </Suspense>
            <Suspense fallback={<UserPostsSkeleton />}>
                <UserPosts />
            </Suspense>
        </div>
    )
}
```

## テストパターン

### コンポーネントテスト

```tsx
// __test__/unit/user-card.test.tsx
import { render, screen } from '@testing-library/react'

import { UserCard } from '@/components/user-card'

describe('UserCard', () => {
    it('ユーザー情報を正しく表示する', () => {
        render(
            <UserCard
                name="田中太郎"
                email="tanaka@example.com"
                isActive={true}
            />
        )

        expect(screen.getByText('田中太郎')).toBeInTheDocument()
        expect(screen.getByText('tanaka@example.com')).toBeInTheDocument()
    })
})
```

### Server Actions テスト

```tsx
// __test__/unit/actions.test.ts
import { updateUser } from '@/lib/actions'

describe('updateUser', () => {
    it('有効なデータでユーザーを更新する', async () => {
        const result = await updateUser('user-1', {
            name: '新しい名前',
            email: 'new@example.com',
        })

        expect(result.success).toBe(true)
        expect(result.data.name).toBe('新しい名前')
    })
})
```
