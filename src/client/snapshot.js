const snapshots = []

export const addSnapshot = snapshot => {
  const last = lastSnapshot()

  if (!last || snapshot.time > last.time) {
    snapshots.push(snapshot)
  }
}

export const lastSnapshot = () => snapshots[snapshots.length - 1]
