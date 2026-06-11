<template>
  <div class="post-edit">
    <!-- 头部 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="$router.back()"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        ></button>
        <h1 class="text-2xl font-bold text-gray-900">{{ isEdit ? '编辑文章' : '新建文章' }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="saveDraft"
          class="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          保存草稿
        </button>
        <button
          @click="publish"
          class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm shadow-blue-200"
        >
          发布文章
        </button>
      </div>
    </div>

    <!-- 表单 -->
    <div px32 py12 flex flex-col v-if="post">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 space-y-6">
          <!-- 标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">文章标题</label>
            <input
              v-model="post.title"
              type="text"
              placeholder="请输入文章标题..."
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- 描述 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">文章描述</label>
            <input
              v-model="post.desc"
              type="text"
              placeholder="请输入文章描述..."
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- 分类和标签 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                v-model="post.category"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="post.category">请选择分类</option>
                <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.name">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">标签</label>
              <div class="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg min-h-[42px]">
                <span
                  v-for="(tag, index) in post.tags"
                  :key="index"
                  class="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium"
                >
                  {{ tag }}
                  <button @click="removeTag(index)" class="text-red-400 hover:text-blue-800">
                    X
                  </button>
                </span>
                <input
                  v-model="tagInput"
                  @keydown.enter.prevent="addTag"
                  type="text"
                  placeholder="输入标签按回车..."
                  class="flex-1 min-w-[100px] outline-none text-sm"
                />
              </div>
            </div>
          </div>
          <!-- 正文编辑器 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">文章内容</label>
            <textarea
              v-model="post.content"
              rows="15"
              placeholder="开始写作..."
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all font-mono leading-relaxed"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div v-else text-8xl wfull hfull flex items-center justify-center>
      <!-- 不对吧，按道理你不应该看见这个 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { usePostStore } from '@/stores/post'
import { useTagStore } from '@/stores/tag'

const props = defineProps<{ id?: string }>()

const postStore = usePostStore()
const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const route = useRoute()
const isEdit = computed(() => !!route.params.id)
const post = ref()

// if (!post.value?.content) {
//   await postStore.fetchPostDetail(props.id).then((p) => {
//     if (p) {
//       postStore.togglePost(p.id)
//     }
//   })
// }
const loading = ref(false)
const error = ref('')
const loadPost = async () => {
  if (post.value?.content) return // 已有数据，不重复加载

  loading.value = true
  error.value = ''

  if (isEdit.value) {
    try {
      const p = await postStore.fetchPostDetail(props.id!)
      if (p) {
        postStore.togglePost(p.id)
      }
    } catch (err) {
      error.value = '加载失败，请重试'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  try {
    await categoryStore.fetchCategories()
  } catch (err) {
    console.error('加载分类失败:', err)
  }
  try {
    await tagStore.fetchTags()
  } catch (err) {
    console.error('加载标签失败:', err)
  }
}
onMounted(() => {
  loadPost().then(() => {
    post.value = isEdit.value
      ? postStore.postDetails.get(props.id!)
      : {
          title: '',
          desc: '',
          content: '',
          category: '',
          tags: [],
        }
  })
})
onUnmounted(() => {
  postStore.togglePost(null)
})
const tagInput = ref('')
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !post.value?.tags.includes(tag)) {
    post.value?.tags.push(tag)
  }
  tagInput.value = ''
}

const removeTag = (index: number | string) => {
  post.value?.tags.splice(Number(index), 1)
}
const saveDraft = async () => {
  if (isEdit.value) {
    try {
      await postStore
        .updatePostDetail(props.id!, {
          title: post.value?.title || '',
          desc: post.value?.desc || '',
          content: post.value?.content || '',
          category: post.value?.category || '',
          tags: post.value?.tags || [],
        })
        .then((result) => {
          alert('保存成功')
        })
    } catch (err) {
      console.error('保存失败:', err)
    }
    return
  }
  try {
    await postStore.createPost({
      title: post.value?.title || '',
      desc: post.value?.desc || '',
      content: post.value?.content || '',
      category: post.value?.category || '',
      tags: post.value?.tags || [],
    })
    alert('保存成功')
  } catch (err) {
    console.error('保存失败:', err)
  }
}

const publish = async () => {
  console.log('发布文章:', post.value)
  saveDraft()
}
</script>

<style scoped lang="scss"></style>
