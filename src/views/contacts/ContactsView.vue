<script setup>
import { useBasketStore } from "@/stores/basketStore";

const basketStore = useBasketStore()



</script>

<template>
    <section class="contacts container">
        <h2 class="contacts__title">Contacts</h2>


        <form class="contacts__inputs">
            <div class="contacts__input1">
                <input class="contacts__inp" type="text" required placeholder="Type your name">
                <input class="contacts__inp" type="text" required placeholder="Type your surname">
            </div>
            <div class="contacts__input2">
                <input class="contacts__inp" type="number" required placeholder="Type your phone number">
                <input class="contacts__inp" type="email" required placeholder="Type your email">
            </div>
            <div class="contacts__input3">
                <input class="contacts__inp" type="text" required placeholder="Type your location">
            </div>

            <button class="contacts__button" type="submit" >Send</button>

        </form>
    </section>
</template>
