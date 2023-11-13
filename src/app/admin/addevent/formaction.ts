'use server'
import { get, push,ref, set, update } from "firebase/database";

import { db } from "@/services/firebaseconfig";

 
export async function formSubmitAction(formData: FormData) {
    "use server";

    const eventReference = ref(db, `events`);

    const result = await push(eventReference, {
        moderator: formData.get("moderatorName"),
        date: formData.get("eventDate"),
        address: formData.get("address"),
        createDateTime: new Date().toISOString(),
    });


    // try {
      
    //   const response = await fetch("/api/addevent", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     body: formData,
    //   });
    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status}`);
    //   }

    //   // Clear the form or give any success message
    //   alert("Event added successfully!");
    // } catch (error) {
    //   console.error("Failed to add event", error);
    // }
  // ...
}