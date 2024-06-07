import { v } from "convex/values"
import { defineSchema, defineTable} from "convex/server"

export default defineSchema({
    documents: defineTable({
        title: v.string(), 
        content: v.string(), 
        parentDocument: v.optional(v.id("documents")), 
        orgId: v.optional(v.string()), 
        authorId: v.string(), 
        authorName: v.string(), 
        icon: v.optional(v.string()), 
        isPublished: v.boolean(), 
        isArchived: v.boolean(), 
    })
    .index("by_org", ['orgId'])
    .index("by_org_parent", ["orgId", 'parentDocument'])
    .index("by_author", ['authorId']) 
    .index("by_author_parent", ["authorId", 'parentDocument'])
    .searchIndex("search_title", {
        searchField: "title", 
        filterFields: ["orgId", "authorId"]
    })
})