import { ignorableWatch } from '@vueuse/core'
import { Ref, WatchOptions, ref } from 'vue'

export function biSyncSetSource<A, B>(
	source: Ref<A>,
	setSource: (clone: A) => B,
	setClone: (source: B) => A,
	deep = true,
): Ref<B> {
	const watchOptions: WatchOptions<false> = {
		deep,
		flush: 'sync',
	}
	const clone = ref() as Ref<B>
	clone.value = setSource(source.value)

	const { ignoreUpdates: ignoreA } = ignorableWatch(
		source,
		newA => {
			ignoreB(() => (clone.value = setSource(newA)))
		},
		watchOptions,
	)
	const { ignoreUpdates: ignoreB } = ignorableWatch(
		clone,
		newB => {
			ignoreA(() => (source.value = setClone(newB)))
		},
		watchOptions,
	)

	return clone

	// return () => {
	// 	stopA(), stopB()
	// }
}
