import { ProfileCard } from "./profileCard.tsx";
import { Addresses } from "./Addresses.tsx";
import React from "react";

export default function Profile() {
  return (
      <main className="profileMain">
        <ProfileCard/>
        <h3>آدرس ها</h3>
        <Addresses/>
      </main>
  );
}