import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

export const create = mutation({
    args: {
        title: v.string(), 
        orgId: v.string(), 
    }, 

    handler:async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity){
            throw new Error("Not Authenticated")
        }

        const document = await ctx.db.insert("document", {
            title: args.title, 
            content: "", 
            orgId: args.orgId, 
            authorId: identity.subject, 
            authorName: identity.name || "",
            isArchived: false, 
            isPublished: false, 
        }); 

        return document
    }


    }
)