<template>
  <div>
    <h1>Priminti slaptažodį</h1>
    <div class="forms-inputs mb-4">
      <span>Elektroninis paštas: </span>
      <input-box-icon :icon-name="'mail'">
        <input
          v-model="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': isInvallid(email) }"
          placeholder="Įveskite el pašto adresą..."
          style="padding-left: 2.5rem; background-color: #f1f2f4"
        />
      </input-box-icon>
      <span v-show="showEmailMessage" style="color: red"> sds </span>
    </div>
    <div class="mb-3">
      <button class="btn w-100" @click="">Pateikti</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
