<script>
  import { setContext } from "svelte";

  export let validator = undefined;
  export let fieldName = undefined;

  setContext("fieldName", fieldName);
</script>

<div
  class:valid={validator.valid[fieldName]}
  class:invalid={validator.invalid[fieldName]}>
  <slot />
</div>
