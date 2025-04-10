
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AIWriter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Writer</h1>
        <p className="text-muted-foreground">
          Generate high-quality LinkedIn content with AI assistance
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">What would you like to write about?</Label>
                <Textarea 
                  id="topic" 
                  placeholder="Enter your topic or idea here..." 
                  className="min-h-[120px]" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Post Format</Label>
                  <Select defaultValue="story">
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="story">Story-based</SelectItem>
                      <SelectItem value="howto">How-to Guide</SelectItem>
                      <SelectItem value="listicle">Listicle</SelectItem>
                      <SelectItem value="question">Thought-provoking Question</SelectItem>
                      <SelectItem value="opinion">Opinion Piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Writing Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="inspiring">Inspiring</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Post Length</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                    <SelectItem value="medium">Medium (3-4 paragraphs)</SelectItem>
                    <SelectItem value="long">Long (5+ paragraphs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Generate Content</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium">Additional Options</h3>
              
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select defaultValue="professionals">
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professionals">Professionals</SelectItem>
                    <SelectItem value="executives">Executives</SelectItem>
                    <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                    <SelectItem value="jobseekers">Job Seekers</SelectItem>
                    <SelectItem value="industry">Industry Specific</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashtags">Include Hashtags</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hashtags"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="hashtags" className="cursor-pointer">
                    Add relevant hashtags to post
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta">Include Call-to-Action</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cta"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="cta" className="cursor-pointer">
                    Add compelling call-to-action
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Generated Content</h3>
            <div className="border rounded-md p-4 min-h-[500px] bg-muted/30 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Your AI-generated content will appear here
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Save to Drafts</Button>
              <Button>Use This Content</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIWriter;
