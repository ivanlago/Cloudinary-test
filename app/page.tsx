"use client";

import { useState } from "react";

function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div>
      <h1>TESTE CLOUDINARY</h1>

      {imageUrl && <img src={imageUrl} alt="Imagem enviada para Cloudinary" />}
      <div className="flex gap-4 mt-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!file) {
              console.warn("Nenhum arquivo selecionado!");
              return;
            }

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/cloudinary", {
              method: "POST",
              body: formData,
              cache: "no-cache",
            });
            const data = await response.json();
            console.log(data);
            setImageUrl(data.url);
          }}
        >
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              } else {
                console.warn("Nenhum arquivo selecionado!");
              }
            }}
            className="bg-gray-600 text-white px-4 py-2 text-xs"
          />
          <button type="submit" className="bg-black text-white px-4 py-2">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
