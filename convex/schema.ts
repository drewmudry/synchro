import { v } from "convex/values"
import { defineSchema, defineTable} from "convex/server"

export default defineSchema({
    document: defineTable({
        title: v.string(), 
        content: v.string(), 
        orgId: v.string(), 
        imageUrl: v.string(), 
        icon: v.string(), 
        isPublished: v.boolean(), 
        isArchived: v.boolean(), 
    })
    .index("by_org", ['orgId'])
    .searchIndex("search_title", {
        searchField: "title", 
        filterFields: ["orgId"]
    })
})