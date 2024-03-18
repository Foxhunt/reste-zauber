import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FormEvent } from "react";

import { useCollection } from "react-firebase-hooks/firestore";

interface CustomElements extends HTMLFormControlsCollection {
  image: HTMLInputElement;
  prompt: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const collectionRef = collection(getFirestore(), "generate");

export default function Page() {
  const [value, loading, error] = useCollection(collectionRef);

  return (
    <div>
      <form
        onSubmit={async (event: FormEvent<CustomForm>) => {
          event.preventDefault();
          const img = event.currentTarget.elements.image.files[0];
          const prompt = event.currentTarget.elements.prompt.value;

          const filreRef = ref(getStorage(), img.name);
          await uploadBytes(filreRef, img);
          await addDoc(collectionRef, {
            img: filreRef.toString(),
            prompt,
          });
        }}
      >
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
        <div key={doc.id} style={{ paddingTop: "10px" }}>
          {doc.data().output}
        </div>
      ))}
    </div>
  );
}
