import { QueryDocumentSnapshot, deleteDoc } from "firebase/firestore";
import { ref, getStorage } from "firebase/storage";
import { useCallback } from "react";

import { useDownloadURL } from "react-firebase-hooks/storage";
import Markdown from "react-markdown";

interface RequestProps {
  doc: QueryDocumentSnapshot;
}

export default function Request({ doc }: RequestProps) {
  const data = doc.data();

  const [url] = useDownloadURL(ref(getStorage(), data.image));

  const deleteRequest = useCallback(async () => {
    await deleteDoc(doc.ref);
  }, [doc]);

  return (
    <div key={doc.id} className="last-of-type:mb-auto">
      <div className="pt-2">prompt: {data.prompt}</div>
      {data.response && (
        <div style={{ paddingTop: "5px" }}>
          out:
          <Markdown>{data.response}</Markdown>
        </div>
      )}
      <div style={{ paddingTop: "5px" }}>state: {data.status?.state}</div>
      {data.status?.error && (
        <div style={{ paddingTop: "5px" }}>error: {data.status?.error}</div>
      )}
      <div style={{ paddingTop: "5px" }}>
        image:
        <img src={url} style={{ height: 200 }} />
      </div>
      <button onClick={deleteRequest}>delete</button>
    </div>
  );
}
