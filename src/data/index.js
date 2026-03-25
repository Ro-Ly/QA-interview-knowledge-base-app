export async function getAllQuestions() {
    const modules = import.meta.glob('./**/*.json')

    const loaded = await Promise.all(
        Object.entries(modules).map(async ([filePath, loader]) => {
            const mod = await loader()
            const data = mod.default

            const parts = filePath.replace('./', '').split('/')
            const categoryFromPath = parts[0] ?? 'Uncategorized'
            const subcategoryFromPath =
                parts.length > 2 ? parts[1] : 'General'

            if (Array.isArray(data)) {
                return data.map((item, index) => ({
                    id: item.id ?? `${filePath}-${index}`,
                    title: item.title ?? 'Untitled',
                    answer: item.answer ?? '',
                    tags: Array.isArray(item.tags) ? item.tags : [],
                    category: item.category ?? categoryFromPath,
                    subcategory: item.subcategory ?? subcategoryFromPath,
                }))
            }

            return [
                {
                    id: data.id ?? filePath,
                    title: data.title ?? 'Untitled',
                    answer: data.answer ?? '',
                    tags: Array.isArray(data.tags) ? data.tags : [],
                    category: data.category ?? categoryFromPath,
                    subcategory: data.subcategory ?? subcategoryFromPath,
                },
            ]
        })
    )

    const flat = loaded.flat()

    const unique = flat.filter((item, index, arr) => {
        return (
            index ===
            arr.findIndex(
                (q) =>
                    q.title === item.title &&
                    q.category === item.category &&
                    q.subcategory === item.subcategory
            )
        )
    })

    return unique
}