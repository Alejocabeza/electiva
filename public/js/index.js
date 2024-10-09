const createForm = document.querySelector('[data-action="create"]');
const updateForm = document.querySelector('[data-action="update"]');

if (createForm) {
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = new FormData(createForm);
    fetch("/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...Object.fromEntries(body),
        price: Number(body.get("price")),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const success = document.getElementById("success");
        if (data.error) {
          if (data.error.name === "ZodError") {
            if (Array.isArray(data.error.issues)) {
              data.error.issues.forEach((issue) => {
                const errorElement = document.getElementById(
                  `${issue.path[0]}-error`
                );
                if (errorElement) {
                  errorElement.textContent = issue.message;
                }
              });
            }
            return;
          }
          const errorElement = document.getElementById(`error`);
          if (errorElement) {
            errorElement.textContent = data.error;
            errorElement.classList.remove("hidden");
          }
          return;
        }
        if (success) {
          const field = ["name", "code", "category", "price"];
          field.forEach((element) => {
            const errorElement = document.getElementById(`${element}-error`);
            if (errorElement) {
              errorElement.textContent = "";
            }
          });
          success.classList.remove("hidden");
          setTimeout(() => {
            success.classList.add("hidden");
            window.location.href = "/";
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

if (updateForm) {
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = new FormData(updateForm);
    fetch(`/update/${window.location.pathname.split('/').pop()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...Object.fromEntries(body),
        price: Number(body.get("price")),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const success = document.getElementById("success");
        if (data.error) {
          if (data.error.name === "ZodError") {
            if (Array.isArray(data.error.issues)) {
              data.error.issues.forEach((issue) => {
                const errorElement = document.getElementById(
                  `${issue.path[0]}-error`
                );
                if (errorElement) {
                  errorElement.textContent = issue.message;
                }
              });
            }
            return;
          }
          const errorElement = document.getElementById(`error`);
          if (errorElement) {
            errorElement.textContent = data.error;
            errorElement.classList.remove("hidden");
          }
          return;
        }
        if (success) {
          const field = ["name", "code", "category", "price"];
          field.forEach((element) => {
            const errorElement = document.getElementById(`${element}-error`);
            if (errorElement) {
              errorElement.textContent = "";
            }
          });
          success.classList.remove("hidden");
          setTimeout(() => {
            success.classList.add("hidden");
            window.location.href = "/";
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
