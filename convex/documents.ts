import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"
import { useOrganization } from "@clerk/clerk-react"
import { clerkClient } from '@clerk/nextjs/server';



export const userArchive = mutation({
    args: {id: v.id("documents")}, 
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        const userId = identity?.subject

        if (!identity) {
            throw new Error("User not authenticated.");
        }

        const existingDocument = await ctx.db.get(args.id)

        if(!existingDocument){
            throw new Error("Not Found")
        }
        if (existingDocument.authorId !== userId){
            throw new Error("Unauthorized")
        }

        const recursiveArchive =async (documentId: Id<"documents">) => {
            const children = await ctx.db
            .query("documents")
            .withIndex("by_author_parent", (q) => (
                q
                    .eq("authorId", userId)
                    .eq("parentDocument", documentId)
            )).collect()

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })

            await recursiveArchive(child._id)
            }
        }
        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        recursiveArchive(args.id)

        return document
    }
})

export const orgArchive = mutation({
    args: {
        id: v.id("documents"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject;

        if (!identity) {
            throw new Error("User not authenticated.");
        }

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not Found");
        }

        if (existingDocument.authorId !== userId) {
            throw new Error("Unauthorized");
        }

        if (existingDocument.orgId !== args.orgId) {
            throw new Error("Document does not belong to the specified organization.");
        }

        const recursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db.query("documents")
                .withIndex("by_org_parent",
                    (q) => q
                        .eq("orgId", args.orgId)
                        .eq("parentDocument", documentId)
                )
                .filter((q) => q.eq(q.field("isArchived"), false))
                .collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                await recursiveArchive(child._id);
            }
        };

        const document = await ctx.db.patch(args.id, {
            isArchived: true,
        });

        await recursiveArchive(args.id);

        return document;
    },
});

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