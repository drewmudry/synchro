import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"
import { useOrganization } from "@clerk/clerk-react"

export const getOrgDocuments = query({
    args: {
        orgId: v.string(),
        parentDocument: v.optional(v.id("documents")),
    },

    handler: async (ctx, args) => {
        const documents = await ctx.db.query("documents")
            .withIndex("by_org_parent",
            (q) => q
                .eq("orgId", args.orgId)
                .eq("parentDocument", args.parentDocument)
            )
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order('desc')
            .collect();

        return documents;
    }
});

export const getUserDocuments = query({
    args: {
        parentDocument: v.optional(v.id("documents")),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("User not authenticated.");
        }

        const documents = await ctx.db.query("documents")
            .withIndex("by_author_parent",
            (q) => q
                .eq("authorId", identity.subject)
                .eq("parentDocument", args.parentDocument)
            )
            .filter((q) => q.eq(q.field("isArchived"), false))
            .filter((q) => q.eq(q.field("orgId"), ""))
            .order('desc')
            .collect();

        return documents;
    }
});

export const createOrgDocument = mutation({
    args: {
        title: v.string(), 
        orgId: v.string(), 
        parentDocument: v.optional(v.id("documents")), 
    }, 

    handler:async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity){
            throw new Error("Not Authenticated")
        }

        const document = await ctx.db.insert("documents", {
            title: args.title, 
            content: "", 
            orgId: args.orgId, 
            parentDocument: args.parentDocument, 
            authorId: identity.subject, 
            authorName: identity.name || "",
            isArchived: false, 
            isPublished: false, 
        }); 

        return document
    }
    }
)

export const createUserDocument = mutation({
    args: {
        title: v.string(), 
        parentDocument: v.optional(v.id("documents")), 
    }, 

    handler:async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity){
            throw new Error("Not Authenticated")
        }

        const document = await ctx.db.insert("documents", {
            title: args.title, 
            content: "", 
            orgId: "", // Set orgId to null for user-specific documents
            parentDocument: args.parentDocument, 
            authorId: identity.subject, 
            authorName: identity.name || "",
            isArchived: false, 
            isPublished: false, 
        }); 

        return document
    }
})