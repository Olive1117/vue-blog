<template>
  <div class="write px-[10vw] py-20 ">
    <form class="flex justify-between gap-4" action="" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-4 flex-4 min-w-0 p-4 border rounded-xl bg-white shadow-xl">
        <div class="flex gap-4">
          <input class="flex-3 border rounded-xl p-4 min-w-0" v-model="editingPost.title" placeholder="标题"></input>
          <input class="flex-1 border rounded-xl p-4 min-w-0" v-model="editingPost.slug"
            placeholder="slug(xx-xx)"></input>
        </div>
        <MdEditor ref="editorRef" v-model="editingPost.content" previewTheme="github" />
      </div>

      <div class="border rounded-xl flex-1 p-4 flex flex-col justify-between bg-white shadow-xl">
        <div class="flex flex-col gap-4">
          <div>
            <p>简介</p>
            <textarea class="border p-2 resize-none w-full" type="text" v-model="editingPost.desc"
              placeholder="为这篇文章写一段简短的摘要"></textarea>
          </div>
          <div>
            <p>分类</p>
            <div class="flex justify-between items-center gap-2">
              <select v-show="!isNewCate" v-model="editingPost.category" class="flex-1 border rounded-xl p-1">
                <option value="" disabled>请选择</option>
                <option v-for="cat in categoryTagStores.category" :key="cat.id" :value="cat.name">{{ cat.name }}
                </option>
                <option v-if="newCategory" :value="newCategory">{{ newCategory }}</option>
              </select>
              <input class="border rounded-xl p-1" v-show="isNewCate" v-model="newCategory" type="text"
                placeholder="输入分类" @keydown.enter.prevent="toggleNewCate(false), editingPost.category = newCategory" />
              <button class="flex items-center text-xl p-1" @click="toggleNewCate()">
                <DynamicIcon iconName="NewSection"></DynamicIcon>
              </button>
            </div>
          </div>
          <div>
            <p>标签</p>
            <div class="border rounded-xl p-2 flex flex-col gap-2">
              <div class="flex flex-wrap gap-1">
                <button class="border p-1 px-2 text-sm rounded-xl flex items-center" v-for="tag in editingPost.tags"
                  :key="tag" @click="removeTag(tag)">
                  <DynamicIcon iconName="Hash"></DynamicIcon>{{ tag }}
                </button>
              </div>
              <input v-model="newTag" class="px-1 focus:outline-none" type="text" placeholder="添加标签（按回车）"
                @keydown.enter.prevent="addTag(newTag)" />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit">{{ isEdit ? '保存文章' : '新建文章' }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ArticleVO } from '@/api/interface';
import { useArchiveStore } from '@/stores/archive';
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { MdEditor, type ExposeParam } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useLayoutStore } from '@/stores/layout';
import DynamicIcon from '@/components/DynamicIcon.vue';
import { useCategoryTagStore } from '@/stores/categoryTag';


const props = defineProps<{ id?: string }>()
const defaultPost = (): ArticleVO => ({
  id: "0",
  title: '',
  desc: '',
  content: '',
  state: 0,
  created_at: '',
  updated_at: '',
  short_id: '',
  word_count: 0,
  image_count: 0,
  slug: '',
  category: '',
  tags: []
})
const editingPost = ref<ArticleVO>(defaultPost())
const layoutStores = useLayoutStore();
const archiveStores = useArchiveStore();
const categoryTagStores = useCategoryTagStore();
const editorRef = useTemplateRef<ExposeParam>('editorRef');
const handleSubmit = () => {
  if (isEdit.value) {
    archiveStores.updatePostDetail(editingPost.value.id, editingPost.value)
  } else {
    archiveStores.createPostDetail(editingPost.value)
  }
}

const isEdit = computed(() => !!props.id)
const newCategory = ref<string>('');
const isNewCate = ref<boolean>(false);
const toggleNewCate = (stats?: boolean) => {
  isNewCate.value = stats ?? !isNewCate.value
}

const newTag = ref<string>('');
const addTag = (tag: string) => {
  const trimmed = tag.trim()
  if (!trimmed) return
  if (editingPost.value.tags.includes(trimmed)) return
  editingPost.value.tags.push(trimmed)
  newTag.value = ''
}
const removeTag = (tag: string) => {
  editingPost.value.tags = editingPost.value.tags.filter(t => t !== tag)
}
onMounted(() => {
  categoryTagStores.fetchCategory()
  editorRef.value?.on('pageFullscreen', layoutStores.toggleImmersive)
  editorRef.value?.on('fullscreen', layoutStores.toggleImmersive)
})
onUnmounted(() => {
  layoutStores.exitImmersive()
})

watch(() => props.id, () => {
  initPage()
}, { immediate: true })
function initPage() {
  if (props.id) {
    // 编辑模式：加载文章数据
    archiveStores.fetchArchiveDetail(props.id).then((res) => { if (res) editingPost.value = res })
  } else {
    // 新建模式：重置表单
    editingPost.value = defaultPost()
  }
}
</script>

<style scoped></style>