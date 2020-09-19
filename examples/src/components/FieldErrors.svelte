<script>
  import { getContext } from "svelte";

  export let validator = undefined;
  export let fieldName = getContext("fieldName");
</script>

{#if validator && fieldName && validator.invalid[fieldName]}
  <div>{validator.invalid[fieldName]}</div>
{/if}
