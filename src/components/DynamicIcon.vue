<template>
  <Icon
    class="dynamic-icon"
    v-if="currentIcon"
    v-bind="$attrs"
    :size="props.size"
    :color="props.color"
    :tag="props.tag"
  >
    <component :is="currentIcon" />
  </Icon>
</template>

<script setup lang="ts">
import { Icon } from "@vicons/utils";
import { computed, type Component } from "vue";
import {
  Home,
  Folders,
  Link,
  ExternalLink,
  User,
  InfoCircle,
  List,
  Clock,
  Books,
  Search,
  Sitemap,
  Notebook,
  Photo,
  Heart,
  Speakerphone,
  Social,
  Message,
  BrandTwitter,
  ChevronDown,
  Bookmark,
  Tag,
  ListSearch,
  Package,
  Archive,
  Pencil,
  EditCircle,
  NewSection,
  Hash,
  FilePlus,
  Trash,
} from "@vicons/tabler";
interface IconProps {
  size?: string | number;
  color?: string;
  tag?: string;
}
interface Props extends IconProps {
  iconName: string;
}
const props = defineProps<Props>();

const iconMap: Record<string, Component> = {
  Home,
  Folders,
  Link,
  ExternalLink,
  User,
  InfoCircle,
  List,
  Clock,
  Books,
  Search,
  Sitemap,
  Notebook,
  Photo,
  Heart,
  Speakerphone,
  Social,
  Message,
  BrandTwitter,
  ChevronDown,
  Bookmark,
  Tag,
  ListSearch,
  Package,
  Archive,
  Pencil,
  EditCircle,
  NewSection,
  Hash,
  FilePlus,
  Trash,
};

const currentIcon = computed(() => iconMap[props.iconName]);
</script>

<style scoped></style>
