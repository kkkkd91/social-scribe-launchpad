
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MoreHorizontal, 
  Calendar, 
  CheckCircle, 
  Edit,
  Copy,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostLibrary = () => {
  const [posts] = useState<any[]>([]);

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No {type} posts yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {type === "draft" && "Start creating content and save as drafts to continue later."}
        {type === "scheduled" && "Schedule your posts to be published at the perfect time."}
        {type === "published" && "Your published posts will appear here."}
      </p>
      <Button>Create New Post</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Post Library</h1>
        <p className="text-muted-foreground">
          Manage all your LinkedIn content in one place
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Search posts..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
          />
          <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" /> Create New Post
        </Button>
      </div>

      <Tabs defaultValue="drafts">
        <TabsList>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>
        <TabsContent value="drafts" className="mt-6">
          {posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <PostCard key={index} post={post} type="draft" />
              ))}
            </div>
          ) : (
            <EmptyState type="draft" />
          )}
        </TabsContent>
        <TabsContent value="scheduled">
          {posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <PostCard key={index} post={post} type="scheduled" />
              ))}
            </div>
          ) : (
            <EmptyState type="scheduled" />
          )}
        </TabsContent>
        <TabsContent value="published">
          {posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <PostCard key={index} post={post} type="published" />
              ))}
            </div>
          ) : (
            <EmptyState type="published" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PostCardProps {
  post: any;
  type: "draft" | "scheduled" | "published";
}

const PostCard = ({ type }: PostCardProps) => {
  // This is a placeholder component - in a real app, we'd use the post data
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-medium">Placeholder Post Title</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            This is a placeholder for a post description or preview. In a real application, 
            this would contain the actual content of the post.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            {type === "draft" && (
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" /> Schedule
              </DropdownMenuItem>
            )}
            {type === "scheduled" && (
              <DropdownMenuItem>
                <CheckCircle className="h-4 w-4 mr-2" /> Publish Now
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {type === "draft" && (
            <>
              <FileText className="h-4 w-4" /> Draft
            </>
          )}
          {type === "scheduled" && (
            <>
              <Calendar className="h-4 w-4" /> Scheduled for May 1, 2025
            </>
          )}
          {type === "published" && (
            <>
              <CheckCircle className="h-4 w-4" /> Published on Apr 15, 2025
            </>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Text Post
        </div>
      </div>
    </div>
  );
};

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default PostLibrary;
