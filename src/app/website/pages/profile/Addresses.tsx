import React from "react";
import { PencilLine } from "@phosphor-icons/react";
import { ProfilePicture } from "../../components";
import { AddressRow } from "./addressRow.tsx";

export const Addresses = () => {
  return (
      <section className="addressSection">
        <AddressRow/>
        <AddressRow/>
        <AddressRow/>
      </section>
  );
};