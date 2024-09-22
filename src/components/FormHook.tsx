import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  lastName: string;
  email: string;
  age: number;
  picture: FileList;
};

const FormHook: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    // Agregar campos de texto
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("age", data.age.toString());

    // Agregar archivo
    if (data.picture[0]) {
      formData.append("picture", data.picture[0]);
    }

    console.log(data);

    // try {
    //   const response = await fetch("YOUR_API_ENDPOINT", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <>
      <h2>FORM WITH FILE</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true, maxLength: 20 })} />
        {errors.name && <span>Name is required</span>}

        <input
          {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })}
        />
        {errors.lastName && <span>Last name is required</span>}

        <input {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}

        <input
          type="number"
          {...register("age", { required: true, min: 18, max: 99 })}
        />
        {errors.age && (
          <span>Age is required and must be between 18 and 99</span>
        )}

        <input
          type="file"
          {...register("picture", {
            required: "Se requiere una foto",
            validate: {
              fileSize: (files) =>
                files[0]?.size < 1000000 ||
                "El tamaño del archivo debe ser inferior a 1 MB",
              fileType: (files) =>
                ["image/jpeg", "image/png", "image/gif"].includes(
                  files[0]?.type
                ) || "Solo se permiten archivos JPG, PNG y GIF",
            },
          })}
        />
        {errors.picture && <span>{errors.picture.message}</span>}
        <input type="submit" />
      </form>
    </>
  );
};

export default FormHook;
