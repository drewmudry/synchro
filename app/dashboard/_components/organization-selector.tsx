"use client"; 
import { useOrganizationList } from "@clerk/clerk-react";

export const OrganizationList = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true, 
        }, 
    })

    if(!userMemberships.data?.length) return null; 

    return (
        <ul className="space-y-4">
            {userMemberships.data?.map((mem)=> (
                <p>
                    {mem.organization.name}
                </p>
                ))
            }
        </ul>
    )
}

