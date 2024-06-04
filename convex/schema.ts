import { v } from "convex/values"
import { defineSchema, defineTable} from "convex/server"

export default defineSchema({
    document: defineTable({
        title: v.string(), 
        content: v.string(), 
        orgId: v.string(), 
        authorId: v.string(), 
        authorName: v.string(), 
        icon: v.optional(v.string()), 
        isPublished: v.boolean(), 
        isArchived: v.boolean(), 
    })
    .index("by_org", ['orgId'])
    .searchIndex("search_title", {
        searchField: "title", 
        filterFields: ["orgId"]
    })
})