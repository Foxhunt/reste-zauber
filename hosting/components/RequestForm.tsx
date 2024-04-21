import { FormEvent, useCallback } from "react";
import { CiCamera } from "react-icons/ci";

import {
  addDoc,
  serverTimestamp,
  collection,
  getFirestore,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const collectionRef = collection(getFirestore(), "requests");

interface CustomElements extends HTMLFormControlsCollection {
  image: HTMLInputElement;
  prompt: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function RequestForm() {
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
    <form
      className="flex flex-col items-center justify-end sticky bottom-0 bg-blue-500 w-full min-h-24"
      onSubmit={handleSubmit}
    >
      <label className="bg-blue-500 w-14 absolute -top-7 aspect-square rounded-full flex items-center justify-center">
        <CiCamera className="h-4/5 w-4/5" />
        <input hidden type="file" name="image" accept="image/png, image/jpeg" />
      </label>
      <div className="w-full h-14 flex flex-row">
        <input className="flex-1" type="text" name="prompt" />
        <input className="w-20" type="submit" />
      </div>
    </form>
  );
}
