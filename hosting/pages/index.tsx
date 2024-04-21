import { collection, getFirestore, orderBy, query } from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";

import RequestForm from "@/components/RequestForm";
import Request from "../components/Request";
import NoRequestPlaceholder from "@/components/NoRequestPlaceholder";

const collectionRef = collection(getFirestore(), "requests");
const queryRef = query(collectionRef, orderBy("createdAt", "desc"));

export default function Index() {
  const [value] = useCollection(queryRef);

  return (
    <main className="flex flex-col h-screen items-center">
      {value?.docs.length ? (
        value?.docs.map((doc) => <Request key={doc.id} doc={doc} />)
      ) : (
        <NoRequestPlaceholder />
      )}
      wasd
      <RequestForm />
    </main>
  );
}
