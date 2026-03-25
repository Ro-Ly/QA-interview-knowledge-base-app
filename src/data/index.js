export async function getAllQuestions() {
    const modules = import.meta.glob('./**/*.json')

    const loaded = await Promise.all(
        Object.entries(modules).map(async ([filePath, loader]) => {
            const mod = await loader()
            const data = mod.default

            const parts = filePath.replace('./', '').split('/')
            const category = parts[0] ?? 'Uncategorized'
            const subcategory = parts[1] ?? 'General'

            if (Array.isArray(data)) {
                return data.map((item, index) => ({
                    id: item.id ?? `${filePath}-${index}`,
                    category: item.category ?? category,
                    subcategory: item.subcategory ?? subcategory,
                    title: item.title ?? 'Untitled',
                    answer: item.answer ?? '',
                    tags: item.tags ?? [],
                }))
            }

            return [
                {
                    id: data.id ?? filePath,
                    category: data.category ?? category,
                    subcategory: data.subcategory ?? subcategory,
                    title: data.title ?? 'Untitled',
                    answer: data.answer ?? '',
                    tags: data.tags ?? [],
                },
            ]
        })
    )

    return loaded.flat()
}