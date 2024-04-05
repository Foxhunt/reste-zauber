import { QueryDocumentSnapshot } from "firebase/firestore";
import { ref, getStorage } from "firebase/storage";

import { useDownloadURL } from "react-firebase-hooks/storage";
import Markdown from "react-markdown";

export default function Request({ doc }: { doc: QueryDocumentSnapshot }) {
  const data = doc.data();

  const [url] = useDownloadURL(ref(getStorage(), data.image));

  return (
    <div key={doc.id} style={{ paddingTop: "10px" }}>
      <div style={{ paddingTop: "5px" }}>prompt: {data.prompt}</div>
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
    </div>
  );
}
