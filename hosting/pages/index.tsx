import { FormEvent, useCallback } from "react";

import {
  addDoc,
  collection,
  query,
  orderBy,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useCollection } from "react-firebase-hooks/firestore";

import Request from "../components/Request";

interface CustomElements extends HTMLFormControlsCollection {
  image: HTMLInputElement;
  prompt: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const collectionRef = collection(getFirestore(), "requests");

const queryRef = query(collectionRef, orderBy("createdAt", "desc"));

export default function Page() {
  const [value] = useCollection(queryRef);

  const handleSubmit = useCallback(async (event: FormEvent<CustomForm>) => {
    event.preventDefault();
    const img = event.currentTarget.elements.image.files[0];
    const prompt = event.currentTarget.elements.prompt.value;

    if (img) {
      const filreRef = ref(getStorage(), "images/" + img.name);
      await uploadBytes(filreRef, img);

      await addDoc(collectionRef, {
        prompt,
        image: filreRef.toString(),
        createdAt: serverTimestamp(),
      });
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          File
          <input type="file" name="image" accept="image/png, image/jpeg" />
        </label>
        <br />
        <label>
          Prompt
          <input type="text" name="prompt" />
        </label>
        <input type="submit" />
      </form>
      {value?.docs.map((doc) => (
        <Request key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
