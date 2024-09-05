<?php

interface FileInterface {

    /**
     * Constructor: Takes a file or directory path or no params.
     *
     * @param string|null $path Path to the file or directory.
     */
    public function __construct(?string $path = null);

    /**
     * Read contents of a file.
     *
     * @return string Contents of the file.
     * @throws Exception If the file cannot be read or does not exist.
     */
    public function read(): string;

    /**
     * Write data to a file.
     *
     * @param string $data Data to write to the file.
     * @return bool True on success, false on failure.
     * @throws Exception If the file cannot be written to.
     */
    public function write(string $data): bool;

    /**
     * Append data to a file.
     *
     * @param string $data Data to append to the file.
     * @return bool True on success, false on failure.
     * @throws Exception If the file cannot be appended to.
     */
    public function append(string $data): bool;

    /**
     * Create a new file or directory.
     *
     * @param string|null $name Optional name of the file or directory to create.
     * @return bool True on success, false on failure.
     */
    public function create(?string $name = null): bool;

    /**
     * Delete a file or directory.
     *
     * @return bool True on success, false on failure.
     * @throws Exception If the file or directory cannot be deleted.
     */
    public function delete(): bool;

    /**
     * Check if the path is a directory.
     *
     * @return bool True if the path is a directory, false otherwise.
     */
    public function isDirectory(): bool;

    /**
     * Check if the path is a file.
     *
     * @return bool True if the path is a file, false otherwise.
     */
    public function isFile(): bool;

    /**
     * Get the file size.
     *
     * @return int Size of the file in bytes.
     * @throws Exception If the file does not exist or cannot be accessed.
     */
    public function getSize(): int;

    /**
     * Static method to check if a file or directory exists.
     *
     * @param string $path Path to the file or directory.
     * @return bool True if the file or directory exists, false otherwise.
     */
    public static function exists(string $path): bool;
}
class File implements FileInterface
{
    private $path;
    private $handle;
    private $mode;
    private $error;

    public function __construct(?string $path = null)
    {
        $this->path = $path;
    }
    public function read(): string
    {
        if (!$this->handle = fopen($this->path, 'r')) {
            throw new Exception(sprintf('Failed to open file "%s": %s', $this->path, $this->error = error_get_last()['message']));
        }
        $contents = stream_get_contents($this->handle);
        fclose($this->handle);
        return $contents;
    }
    public function write(string $data): bool
    {
        if (!$this->handle = fopen($this->path, 'w')) {
            throw new Exception(sprintf('Failed to open file "%s": %s', $this->path, $this->error = error_get_last()['message']));
        }
        return fwrite($this->handle, $data) > 0;
    }
    public function append(string $data): bool
    {
        if (!$this->handle = fopen($this->path, 'a')) {
            throw new Exception(sprintf('Failed to open file "%s": %s', $this->path, $this->error = error_get_last()['message']));
        }
        return fwrite($this->handle, $data) > 0;
    }
    public function create(?string $name = null): bool
    {
        $newPath = $this->path . ($name ? '/' . $name : '');
        return mkdir($newPath, 0777, true);
    }
    public function delete(): bool
    {
        return unlink($this->path);
    }
    public function isDirectory(): bool
    {
        return is_dir($this->path);
    }

    public function isFile(): bool
    {
        return is_file($this->path);
    }
    public function getSize(): int
    {
        return filesize($this->path);
    }
    public static function exists(string $path): bool
    {
        return file_exists($path);
    }
}

?>