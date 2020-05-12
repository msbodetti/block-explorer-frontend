class Block {
    title: string;
    id: number;
    constructor(title: string, id: number) {
        this.title = title;
        this.id = id;
    }
}
function formatBlock(block: any): Block {
    return { title: block.title, id: block.id };
}

export class ApiService {
    getBlocks(block: string): Promise<Block[]> {
        return fetch(`https://blockexplorer.dyn-ip.me/blocks`)
            .then(res => res.json())
            .then(res => res)
    }
}